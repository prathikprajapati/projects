from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:5680@localhost/pregnancy_db'  # Update with your MySQL password
app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')  # Use get to avoid KeyError
        password = request.form.get('password')  # Use get to avoid KeyError
        
        if not username or not password:
            flash("Username and password are required", "danger")
            return redirect(url_for('login'))
        
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash("Login successful", "success")
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid username or password", "danger")
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')  # Use get to avoid KeyError
        email = request.form.get('email')  # Use get to avoid KeyError
        password = request.form.get('password')  # Use get to avoid KeyError

        if not username or not email or not password:
            flash("All fields are required", "danger")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(username=username, email=email, password=hashed_password)
        try:
            db.session.add(new_user)
            db.session.commit()
            flash("Registration successful", "success")
            return redirect(url_for('login'))
        except:
            db.session.rollback()
            flash("Username or email already exists", "danger")
    return render_template('register.html')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/mood_entry')
@login_required
def mood_entry():
    return render_template('mood_entry.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("You have been logged out", "success")
    return redirect(url_for('login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
