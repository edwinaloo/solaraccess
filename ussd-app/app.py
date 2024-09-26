import os
from flask import Flask, request

app = Flask(__name__)

@app.route("/ussd", methods=['POST'])
def ussd():
    # Read the variables sent via POST from our API
    session_id = request.values.get("sessionId", None)
    serviceCode = request.values.get("serviceCode", None)
    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "")

    # Handle different user inputs
    if text == '':
        response = "CON Welcome to Solar Services\n"
        response += "1. Buy Solar System\n"
        response += "2. Pay Outstanding Balance\n"
        response += "3. Upgrade or Degrade Service"

    elif text == '1':
        response = "CON Choose a Solar System to purchase:\n"
        response += "1. Small Solar System\n"
        response += "2. Medium Solar System\n"
        response += "3. Large Solar System"

    elif text == '1*1':  # Small Solar System
        response = "CON Small Solar System costs $1000.\n"
        response += "1. Confirm Order\n"
        response += "2. Back to Solar System Options"

    elif text == '1*2':  # Medium Solar System
        response = "CON Medium Solar System costs $2000.\n"
        response += "1. Confirm Order\n"
        response += "2. Back to Solar System Options"

    elif text == '1*3':  # Large Solar System
        response = "CON Large Solar System costs $3000.\n"
        response += "1. Confirm Order\n"
        response += "2. Back to Solar System Options"

    elif text in ['1*1*1', '1*2*1', '1*3*1']:  # Confirm order
        # Here you can add logic to handle order confirmation
        response = "END Thank you for your order! A confirmation SMS will be sent shortly."

    elif text in ['1*1*2', '1*2*2', '1*3*2']:  # Back to Solar System options
        response = "CON Choose a Solar System to purchase:\n"
        response += "1. Small Solar System\n"
        response += "2. Medium Solar System\n"
        response += "3. Large Solar System"

    elif text == '2':
        response = "CON Outstanding Dues:\n"
        response += "1. Pay $50\n"
        response += "2. Pay $100\n"
        response += "3. Back to Main Menu"

    elif text == '2*1':  # Pay $50
        response = "CON You are about to pay $50.\n"
        response += "1. Confirm Payment\n"
        response += "2. Back to Outstanding Dues"

    elif text == '2*2':  # Pay $100
        response = "CON You are about to pay $100.\n"
        response += "1. Confirm Payment\n"
        response += "2. Back to Outstanding Dues"

    elif text in ['2*1*1', '2*2*1']:  # Confirm payment
        # Add logic to handle payment confirmation
        response = "END Payment confirmed! Thank you."

    elif text in ['2*1*2', '2*2*2']:  # Back to Outstanding Dues
        response = "CON Outstanding Dues:\n"
        response += "1. Pay $50\n"
        response += "2. Pay $100\n"
        response += "3. Back to Main Menu"

    elif text == '3':
        response = "CON Choose an option:\n"
        response += "1. Upgrade Service\n"
        response += "2. Degrade Service"

    elif text == '3*1':  # Upgrade
        response = "END Your service has been upgraded!"

    elif text == '3*2':  # Degrade
        response = "END Your service has been degraded!"

    else:
        response = "END Invalid choice"

    return response

if __name__ == '__main__':
    app.run(debug=True)
