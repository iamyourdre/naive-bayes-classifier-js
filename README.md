# Naive Bayes Classifier JS

### With Node JS, Express and MySQL

![Screenshot](https://i.ibb.co/fvxH2dj/image.png)

## A. How to Configure:

### 1. Install Backend Prerequisite.

- Move to `cd backend`
- Run `npm i express mysql2 sequelize cors mathjs`

### 2. Configure Database.
- Set the database connection in "backend/config/Database.js"
- Import "sample.sql" to 'naive_bayes_js' database.

### 3. Run Server.
- Check `nodemon -v`. If you have not installed yet, run `npm i -g nodemon`
- Start backend server with `nodemon index` (Make sure your terminal path is on "your-project/backend")

## ___________________

## B. How to Use:
- First of all, you need to calculate "sample" table with Naive Bayes algorithm first, then it will be summarized as "NB_dataclass" table. You can use Rest Client or POSTMAN. <b> Run it once</b>.
```
POST http://localhost:5000/CreateNaiveBayesDataset
Content-Type: application/json
```
- Then, <b>put your input on x1, x2, x3, and x4 and run it</b>. It will classify the genre from your input. 
```
POST http://localhost:5000/NaiveBayesClassifier
Content-Type: application/json

{
    "x1": 30, "x2": 922001, "x3": 3631, "x4": 3726
}
```
After process completed, the output will be like this:
```
{
  "msg": "Calculation Completed! Your input is classified as:",
  "result": [
    {
      "genreIs": "Hardrock",
      "probability": 0.024855977439682212
    }
  ]
}
```