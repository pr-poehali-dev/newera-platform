import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для получения списка модификаций с фильтрацией и сортировкой'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    query_params = event.get('queryStringParameters') or {}
    search = query_params.get('search', '')
    category = query_params.get('category', 'all')
    game = query_params.get('game', 'all')
    price_filter = query_params.get('price', 'all')
    sort_by = query_params.get('sort', 'popular')
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        query = '''
            SELECT 
                m.id, m.title, m.description, m.price, m.is_free,
                m.rating, m.downloads_count, m.created_at,
                mc.name as category, gv.name as game,
                u.username as author,
                (SELECT image_url FROM mod_images WHERE mod_id = m.id LIMIT 1) as image
            FROM mods m
            LEFT JOIN mod_categories mc ON m.category_id = mc.id
            LEFT JOIN game_versions gv ON m.game_version_id = gv.id
            LEFT JOIN users u ON m.author_id = u.id
            WHERE m.status = 'approved'
        '''
        
        conditions = []
        params = []
        
        if search:
            conditions.append("(m.title ILIKE %s OR m.description ILIKE %s)")
            search_param = f'%{search}%'
            params.extend([search_param, search_param])
        
        if category != 'all':
            conditions.append("mc.name = %s")
            params.append(category)
        
        if game != 'all':
            conditions.append("gv.name = %s")
            params.append(game)
        
        if price_filter == 'free':
            conditions.append("m.is_free = TRUE")
        elif price_filter == 'paid':
            conditions.append("m.is_free = FALSE")
        
        if conditions:
            query += " AND " + " AND ".join(conditions)
        
        if sort_by == 'popular':
            query += " ORDER BY m.downloads_count DESC"
        elif sort_by == 'rating':
            query += " ORDER BY m.rating DESC"
        elif sort_by == 'newest':
            query += " ORDER BY m.created_at DESC"
        elif sort_by == 'price-asc':
            query += " ORDER BY m.price ASC"
        elif sort_by == 'price-desc':
            query += " ORDER BY m.price DESC"
        
        query += " LIMIT 100"
        
        cur.execute(query, params)
        mods = cur.fetchall()
        
        result = []
        for mod in mods:
            result.append({
                'id': mod['id'],
                'title': mod['title'],
                'description': mod['description'],
                'price': mod['price'],
                'isPaid': not mod['is_free'],
                'category': mod['category'] or 'Без категории',
                'game': mod['game'] or 'GTA V',
                'rating': float(mod['rating']) if mod['rating'] else 0.0,
                'downloads': mod['downloads_count'] or 0,
                'image': mod['image'] or 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
                'author': mod['author'] or 'Неизвестный'
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'mods': result, 'total': len(result)})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
