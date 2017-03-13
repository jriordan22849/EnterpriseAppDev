// CRUD Operations
curl  --data "id=4&name=Adam Bari&room=9&ext=ext5"  http://127.0.0.1:3000/judge

curl  --data "id=6&name=Jonathan Riordan&address=Blackrock&type=claimant"  http://127.0.0.1:3000/participant

curl  --data "id=12&number=22"  http://127.0.0.1:3000/courtroom

curl  --data "judge_id=4&courtroom_id=1&claimant_id=6&respondent_id=0&start_date=1/1/2017&duration=6&result=true"  http://127.0.0.1:3000/caseclear



curl -X DELETE http://127.0.0.1:3000/courtroom/12

curl -X DELETE http://127.0.0.1:3000/participant/6

curl -X DELETE http://127.0.0.1:3000/case/1

curl -X DELETE http://127.0.0.1:3000/judge/4



curl -X PUT --data "room=100" http://127.0.0.1:3000/judge/1

curl -X PUT --data "result=false" http://127.0.0.1:3000/case/10

curl -X PUT --data "type=respondent" http://127.0.0.1:3000/participant/1s

curl -X PUT --data "number=10" http://127.0.0.1:3000/courtroom/2


// Insert user - password is hashed.
localhost:3000/adduser?username=barry&password=123