terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  required_version = ">= 1.0"
}


provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true

  endpoints {
    s3control = "http://localhost:4566"
    s3        = "http://s3.localhost.localstack.cloud:4566"
  }
}

resource "aws_s3_bucket" "test_bucket" {
  bucket = "etl-test-bucket"
}

output "bucket_name" {
  value = aws_s3_bucket.test_bucket.bucket
}
