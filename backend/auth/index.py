import json
import os
import hmac
import hashlib
from urllib.parse import parse_qs
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для авторизации пользователей через Telegram'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        return telegram_auth(event)
    elif method == 'GET':
        query_params = event.get('queryStringParameters', {})
        if query_params:
            return telegram_callback(query_params)
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def verify_telegram_auth(auth_data: dict, bot_token: str) -> bool:
    '''Проверка подлинности данных от Telegram'''
    check_hash = auth_data.get('hash')
    if not check_hash:
        return False
    
    data_check_arr = []
    for key, value in sorted(auth_data.items()):
        if key != 'hash':
            data_check_arr.append(f'{key}={value}')
    
    data_check_string = '\n'.join(data_check_arr)
    
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    
    return calculated_hash == check_hash

def telegram_auth(event: dict) -> dict:
    '''Обработка авторизации через Telegram'''
    
    try:
        body = json.loads(event.get('body', '{}'))
        auth_data = body.get('auth_data', {})
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Bot token not configured'}),
                'isBase64Encoded': False
            }
        
        if not verify_telegram_auth(auth_data, bot_token):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid authentication data'}),
                'isBase64Encoded': False
            }
        
        telegram_id = str(auth_data.get('id'))
        first_name = auth_data.get('first_name', '')
        last_name = auth_data.get('last_name', '')
        username = auth_data.get('username', '')
        photo_url = auth_data.get('photo_url', '')
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            'SELECT * FROM t_p51465160_newera_platform.users WHERE telegram_id = %s',
            (telegram_id,)
        )
        user = cur.fetchone()
        
        if user:
            cur.execute('''
                UPDATE t_p51465160_newera_platform.users 
                SET last_login = NOW(), first_name = %s, last_name = %s, photo_url = %s
                WHERE telegram_id = %s
                RETURNING id, username, email, first_name, last_name, photo_url, avatar_url
            ''', (first_name, last_name, photo_url, telegram_id))
            user = cur.fetchone()
        else:
            display_username = username or f'user_{telegram_id}'
            cur.execute('''
                INSERT INTO t_p51465160_newera_platform.users 
                (telegram_id, username, first_name, last_name, photo_url, avatar_url, created_at, last_login, email_verified, is_blocked)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), true, false)
                RETURNING id, username, email, first_name, last_name, photo_url, avatar_url
            ''', (telegram_id, display_username, first_name, last_name, photo_url, photo_url))
            user = cur.fetchone()
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'],
                    'firstName': user['first_name'],
                    'lastName': user['last_name'],
                    'avatar': user['photo_url'] or user['avatar_url']
                }
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def telegram_callback(query_params: dict) -> dict:
    '''Обработка callback от Telegram виджета'''
    
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
                'body': '<script>window.close();</script>',
                'isBase64Encoded': False
            }
        
        if not verify_telegram_auth(query_params, bot_token):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
                'body': '<script>alert("Authentication failed"); window.close();</script>',
                'isBase64Encoded': False
            }
        
        telegram_id = str(query_params.get('id'))
        first_name = query_params.get('first_name', '')
        last_name = query_params.get('last_name', '')
        username = query_params.get('username', '')
        photo_url = query_params.get('photo_url', '')
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            'SELECT * FROM t_p51465160_newera_platform.users WHERE telegram_id = %s',
            (telegram_id,)
        )
        user = cur.fetchone()
        
        if user:
            cur.execute('''
                UPDATE t_p51465160_newera_platform.users 
                SET last_login = NOW(), first_name = %s, last_name = %s, photo_url = %s
                WHERE telegram_id = %s
                RETURNING id, username, email, first_name, last_name, photo_url, avatar_url
            ''', (first_name, last_name, photo_url, telegram_id))
            user = cur.fetchone()
        else:
            display_username = username or f'user_{telegram_id}'
            cur.execute('''
                INSERT INTO t_p51465160_newera_platform.users 
                (telegram_id, username, first_name, last_name, photo_url, avatar_url, created_at, last_login, email_verified, is_blocked)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), true, false)
                RETURNING id, username, email, first_name, last_name, photo_url, avatar_url
            ''', (telegram_id, display_username, first_name, last_name, photo_url, photo_url))
            user = cur.fetchone()
        
        conn.commit()
        cur.close()
        conn.close()
        
        user_data = {
            'id': user['id'],
            'username': user['username'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'avatar': user['photo_url'] or user['avatar_url']
        }
        
        html_response = f'''
        <html>
        <body>
        <script>
            window.opener.postMessage({{
                type: 'telegram_auth',
                user: {json.dumps(user_data)}
            }}, '*');
            window.close();
        </script>
        </body>
        </html>
        '''
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            'body': html_response,
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            'body': f'<script>alert("Error: {str(e)}"); window.close();</script>',
            'isBase64Encoded': False
        }
