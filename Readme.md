# Phone Tracker Web Application

Phone Tracker helps you find and locate your phone by feeding the relevent data to the website, please provide the details
carefully.once you have registered your phone, other people might want to help you out by reaching you with your email address!


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## 1. Fork The Repository

```bash
git clone https://github.com/GeekkyCoder/FYP.git
```

## 2. Create Your Own Branch to Collaborate
```
git checkout -b feature-branch
```

## 3. Installation

### Frontend
In the root directory, install the dependencies:
```bash
npm i 
```

### Backend
Navigate to the server folder and install the backend dependencies:
```bash
cd server
```
```bash
npm i
```

## 4. Environment Variables
Make sure to set the following environment variables:

. `HOST=<8000>`

. `ACCESS_TOKEN=<provide a access token , a random big string>`

. `JWT_LIFETIME=<provide a number here, what will be lifetime of jwt token lifetime, afterwards it will expires>`

. `MONGO_URL=<your mongodb database url>`

. `EMAIL=<your email for sending out emails to customers>`

. `PASSWORD=<your email app password>`

. `SERVICE=<gmail>`


## 5. Run the Application
### Frontend
In the root directory, run:
```bash
npm run dev
```

### Backend
Navigate to the server directory and run:
```bash
npm run watch
```

## Usage
Copy and paste the frontend localhost on your browser:
http://localhost:5173

## Note: 
if you see your frontend localhost being set to `127.0.0.1` change it to `localhost:5173`. 



