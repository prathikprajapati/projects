from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify, send_from_directory
from flask_login import current_user
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.urandom(24)

# User class for authentication
class User(UserMixin):
    def __init__(self, id, username, email, password):
        self.id = id
        self.username = username
        self.email = email
        self.password = password

# Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    users = load_users()
    user_data = users.get(user_id)
    if user_data:
        return User(user_id, user_data['username'], user_data['email'], user_data['password'])
    return None

def load_users():
    try:
        with open('users.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def save_users(users):
    with open('users.json', 'w') as f:
        json.dump(users, f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/courses')
@login_required
def courses():
    return render_template('courses.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        users = load_users()
        
        for user_id, user_data in users.items():
            if user_data['email'] == email and check_password_hash(user_data['password'], password):
                user = User(user_id, user_data['username'], email, user_data['password'])
                login_user(user)
                return redirect(url_for('dashboard'))
        
        flash('Invalid email or password')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        users = load_users()
        new_id = str(len(users) + 1)
        
        users[new_id] = {
            'username': username,
            'email': email,
            'password': generate_password_hash(password)
        }
        
        save_users(users)
        flash('Account created successfully! Please login.')
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

@app.route('/settings')
@login_required
def settings():
    return render_template('settings.html')

@app.route('/get-user')
@login_required
def get_user():
    return jsonify({
        'username': current_user.username,
        'email': current_user.email
    })

# Static files route
@app.route('/assets/<path:filename>')
def serve_static(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    app.run(debug=True)
