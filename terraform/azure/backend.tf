# Plan de App Service
resource "azurerm_service_plan" "backend_plan" {
  name                = "backend-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location           = azurerm_resource_group.rg.location
  os_type            = "Linux"
  sku_name           = "P1v2"
}

# App Service para el backend
resource "azurerm_linux_web_app" "backend" {
  name                = "mcf-backend-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location           = azurerm_resource_group.rg.location
  service_plan_id    = azurerm_service_plan.backend_plan.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
    always_on = true
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~20"
    "NODE_ENV"                     = "production"
    "WEBSITE_RUN_FROM_PACKAGE"     = "1"
  }

  tags = {
    Environment = "Production"
    Project     = "Microfrontend"
    Component   = "Backend"
  }
}

# Configuración de Application Insights
resource "azurerm_application_insights" "backend_insights" {
  name                = "backend-insights-${random_string.suffix.result}"
  location           = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
} 