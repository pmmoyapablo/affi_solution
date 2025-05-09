# General Variables

variable "region-dcp" {
  description = "Region DCP to deploy"
  default     = "us-east-1"
}

variable "region-dca" {
  description = "Region DCA to deploy"
  default     = "us-east-2"
}

variable "profile" {
  description = "Profile to account AWS"
  default     = "finkargo-devops"
}

variable "project" {
  description = "Name Project"
  default     = "finkargo"
}

variable "domain" {
  description = "Domain Project"
  default     = "finkargo.com"
}

variable "stage" {
  description = "Stage Project"
  default     = "develop"
}

variable "country" {
  description = "Country to deploy"
  default     = "co"
}

variable "monitoring" {
  description = "Monitoring microservices cluster"
  default     = "disabled"
}
variable "group" {
  description = "Docker or Kube Application"
  default     = "docker"
}
variable "type" {
  description = "Resource Type"
  default     = "cluster"
}

variable "aliases" {
  description = "A list of objects to create dns aliases - cname"
  type        = list(string)
  default     = []
}

variable "bucket_name" {
  description = "The name of the bucket. If omitted, Terraform will assign a random, unique name"
}

variable "origin_access_identity" {
  description = "The CloudFront origin access identity to associate with the origin"
}