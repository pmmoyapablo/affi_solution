provider "aws" {
  region = "us-east-1"
  access_key = var.access_key
  secret_key = var.secret_key

  s3_use_path_style = true
  skip_credentials_validation = true
  skip_metadata_api_check = true
  skip_requesting_account_id = true

  endpoints {
    s3 = "http://localhost:4566"
    iam = "http://localhost:4566"
    elb = "http://localhost:4566"
    ec2 = "http://localhost:4566"
  }
}