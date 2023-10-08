scp -i ~/.ssh/ryori/ryori.pem -r dist ec2-user@54.199.120.11:~/ryoriapi
ssh -i ~/.ssh/ryori/ryori.pem ec2-user@54.199.120.11 'pm2 restart 0'