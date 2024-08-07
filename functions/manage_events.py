import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_lambda import FlaskLambda

app = FlaskLambda(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=True)
    time = db.Column(db.String(20), nullable=True)
    idea = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/events', methods=['GET', 'POST'])
def manage_events():
    if request.method == 'POST':
        data = request.json
        new_event = Event(
            name=data['name'],
            date=data['date'],
            time=data['time'],
            idea=data['idea']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'status': 'Event added', 'event': data}), 201
    else:
        events = Event.query.all()
        return jsonify([{
            'name': event.name,
            'date': event.date,
            'time': event.time,
            'idea': event.idea
        } for event in events])

if __name__ == '__main__':
    app.run(debug=True)
