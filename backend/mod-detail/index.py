import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для получения детальной информации о модификации'''
    
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
    mod_id = query_params.get('id')
    
    if not mod_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing mod ID'})
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            SELECT 
                m.id, m.title, m.description, m.price, m.is_free,
                m.rating, m.downloads_count, m.download_url, m.created_at,
                m.installation_guide, m.requirements, m.changelog,
                mc.name as category, gv.name as game,
                u.id as author_id, u.username as author, u.avatar_url as author_avatar
            FROM mods m
            LEFT JOIN mod_categories mc ON m.category_id = mc.id
            LEFT JOIN game_versions gv ON m.game_version_id = gv.id
            LEFT JOIN users u ON m.author_id = u.id
            WHERE m.id = %s AND m.status = 'approved'
        ''', (mod_id,))
        
        mod = cur.fetchone()
        
        if not mod:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Mod not found'})
            }
        
        cur.execute('''
            SELECT image_url, is_primary
            FROM mod_images
            WHERE mod_id = %s
            ORDER BY is_primary DESC, id ASC
        ''', (mod_id,))
        images = [row['image_url'] for row in cur.fetchall()]
        
        cur.execute('''
            SELECT 
                r.id, r.rating, r.comment, r.created_at,
                u.username as author, u.avatar_url as author_avatar
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.mod_id = %s
            ORDER BY r.created_at DESC
            LIMIT 10
        ''', (mod_id,))
        reviews = cur.fetchall()
        
        result = {
            'id': mod['id'],
            'title': mod['title'],
            'description': mod['description'],
            'price': mod['price'],
            'isPaid': not mod['is_free'],
            'category': mod['category'] or 'Без категории',
            'game': mod['game'] or 'GTA V',
            'rating': float(mod['rating']) if mod['rating'] else 0.0,
            'downloads': mod['downloads_count'] or 0,
            'downloadUrl': mod['download_url'],
            'installationGuide': mod['installation_guide'] or '',
            'requirements': mod['requirements'] or '',
            'changelog': mod['changelog'] or '',
            'images': images if images else ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'],
            'author': {
                'id': mod['author_id'],
                'username': mod['author'] or 'Неизвестный',
                'avatar': mod['author_avatar']
            },
            'reviews': [
                {
                    'id': r['id'],
                    'rating': r['rating'],
                    'comment': r['comment'],
                    'date': r['created_at'].isoformat() if r['created_at'] else '',
                    'author': r['author'] or 'Аноним',
                    'avatar': r['author_avatar']
                }
                for r in reviews
            ]
        }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
