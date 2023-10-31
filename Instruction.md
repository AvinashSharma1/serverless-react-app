## How to move build from local server to s3 bucket
## Install AWS CLI:
Open your Terminal application.
Install AWS CLI using Homebrew with the command: brew install awscli.
Verify the installation with aws --version.
Configure AWS credentials using aws configure if not done already.
4. Upload Files to the S3 Bucket:
To upload files using the AWS CLI, execute the following command:

## aws s3 cp /path/to/source s3://bucket-name/ --recursive