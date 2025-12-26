import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для обработки покупок модификаций'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': ''
        }
    
    if method == 'POST':
        return handle_purchase(event)
    elif method == 'GET':
        return get_user_purchases(event)
    else:
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

def handle_purchase(event: dict) -> dict:
    '''Обработка новой покупки'''
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User not authenticated'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        mod_id = body.get('mod_id')
        
        if not mod_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing mod_id'})
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('SELECT id, price, is_free FROM mods WHERE id = %s', (mod_id,))
        mod = cur.fetchone()
        
        if not mod:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Mod not found'})
            }
        
        cur.execute(
            'SELECT id FROM purchases WHERE user_id = %s AND mod_id = %s',
            (user_id, mod_id)
        )
        existing = cur.fetchone()
        
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 409,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Already purchased'})
            }
        
        amount = 0 if mod['is_free'] else mod['price']
        
        cur.execute('''
            INSERT INTO purchases (user_id, mod_id, amount, status)
            VALUES (%s, %s, %s, 'completed')
            RETURNING id
        ''', (user_id, mod_id, amount))
        
        purchase_id = cur.fetchone()['id']
        
        cur.execute(
            'UPDATE mods SET downloads_count = downloads_count + 1 WHERE id = %s',
            (mod_id,)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'purchase_id': purchase_id,
                'message': 'Мод успешно добавлен в вашу коллекцию'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }

def get_user_purchases(event: dict) -> dict:
    '''Получение списка покупок пользователя'''
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User not authenticated'})
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            SELECT 
                p.id, p.amount, p.created_at,
                m.id as mod_id, m.title, m.description, m.download_url,
                (SELECT image_url FROM mod_images WHERE mod_id = m.id LIMIT 1) as image
            FROM purchases p
            JOIN mods m ON p.mod_id = m.id
            WHERE p.user_id = %s
            ORDER BY p.created_at DESC
        ''', (user_id,))
        
        purchases = cur.fetchall()
        
        result = [
            {
                'id': p['id'],
                'modId': p['mod_id'],
                'title': p['title'],
                'description': p['description'],
                'downloadUrl': p['download_url'],
                'image': p['image'] or 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
                'amount': p['amount'],
                'date': p['created_at'].isoformat() if p['created_at'] else ''
            }
            for p in purchases
        ]
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'purchases': result})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
