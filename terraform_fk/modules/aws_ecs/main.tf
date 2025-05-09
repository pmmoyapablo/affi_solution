# Contains the code that provisions the resources in the cloud.

# Cluster ECS

resource "aws_ecs_cluster" "finkargo" {
  name = "${var.type}-${var.stage}-${var.group}-${var.project}"


  configuration {
    execute_command_configuration {
      kms_key_id = aws_kms_key.finkargo.arn
      logging    = "OVERRIDE"

      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.finkargo.name
      }
    }
  }

  setting {
    name  = "containerInsights"
    value = var.monitoring
  }
  tags = {
    "Name" = "${var.type}-${var.stage}-${var.group}-${var.project}"
  }
  depends_on = [
    aws_kms_key.finkargo, aws_kms_alias.finkargo
  ]
}


# KMS Key

resource "aws_kms_key" "finkargo" {
  description             = "kms-${var.type}-${var.stage}-${var.group}-${var.project}"
  deletion_window_in_days = 10
  policy                  = file("./policies/policy-kms.json")
  tags = {
    "Name" = "kms-${var.type}-${var.stage}-${var.group}-${var.project}"
  }
}

resource "aws_kms_alias" "finkargo" {
  name          = "alias/kms-${var.type}-${var.stage}-${var.group}-${var.project}"
  target_key_id = aws_kms_key.finkargo.id
}

# Logs Cloudwatch

resource "aws_cloudwatch_log_group" "finkargo" {
  name       = "/ecs/${var.type}/${var.stage}/${var.group}/${var.project}"
  kms_key_id = aws_kms_key.finkargo.arn
  tags = {
    "Name" = "log-group-${var.type}-${var.stage}-${var.group}-${var.project}"
  }
}