terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate"
    storage_account_name = "tfstate${random_string.suffix.result}"
    container_name      = "tfstate"
    key                 = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Generar un sufijo aleatorio para nombres únicos
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Grupo de recursos
resource "azurerm_resource_group" "rg" {
  name     = "mcf-angular-rg"
  location = "East US"
  tags = {
    Environment = "Production"
    Project     = "Microfrontend"
  }
} 