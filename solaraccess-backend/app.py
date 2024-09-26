from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

AFRICASTALKING_USERNAME = 'niceone'  # Replace with your Africa's Talking username
AFRICASTALKING_API_KEY = 'atsk_0d6485c5f33a29e34c98bf4f077b59e9251a8b250ff3b6e39232c4b04d4b579271ae84bb'  # Replace with your Africa's Talking API key

@app.route('/check-usage', methods=['POST'])
def check_usage():
    data = request.get_json()
    phone_number = data.get('phoneNumber')
    try:
        response = requests.post(
            'https://api.africastalking.com/version1/messaging',
            json={
                'username': AFRICASTALKING_USERNAME,
                'to': phone_number,
                'message': 'Check Usage'
            },
            headers={
                'apiKey': AFRICASTALKING_API_KEY
            }
        )
        response_data = response.json()
        return jsonify({'message': response_data['SMSMessageData']['Message']})
    except Exception as e:
        print(f'Error checking usage: {e}')
        return jsonify({'error': 'Error checking usage'}), 500

@app.route('/purchase-credits', methods=['POST'])
def purchase_credits():
    data = request.get_json()
    phone_number = data.get('phoneNumber')
    try:
        response = requests.post(
            'https://api.africastalking.com/version1/airtime/send',
            json={
                'username': AFRICASTALKING_USERNAME,
                'recipients': [{
                    'phoneNumber': phone_number,
                    'amount': 'KES 10'
                }]
            },
            headers={
                'apiKey': AFRICASTALKING_API_KEY
            }
        )
        response_data = response.json()
        return jsonify({'status': response_data['responses'][0]['status']})
    except Exception as e:
        print(f'Error purchasing credits: {e}')
        return jsonify({'error': 'Error purchasing credits'}), 500

@app.route("/ussd", methods=['POST'])
def ussd():
    session_id = request.values.get("sessionId", None)
    serviceCode = request.values.get("serviceCode", None)
    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "default")

    if text == '':
        response = "CON What would you want to check \n"
        response += "1. My Account \n"
        response += "2. My phone number"
    elif text == '1':
        response = "CON Choose account information you want to view \n"
        response += "1. Account number"
    elif text == '2':
        response = f"END Your phone number is {phone_number}"
    elif text == '1*1':
        accountNumber = "ACC1001"
        response = f"END Your account number is {accountNumber}"
    else:
        response = "END Invalid choice"

    return response

if __name__ == '__main__':
    app.run(debug=True)
