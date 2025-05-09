# Plan de App Service para el frontend
resource "azurerm_service_plan" "frontend_plan" {
  name                = "frontend-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location           = azurerm_resource_group.rg.location
  os_type            = "Linux"
  sku_name           = "P1v2"
}

# App Service para el frontend
resource "azurerm_linux_web_app" "frontend" {
  name                = "mcf-frontend-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location           = azurerm_resource_group.rg.location
  service_plan_id    = azurerm_service_plan.frontend_plan.id

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
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "true"
    "WEBSITE_WEBSOCKET_ENABLED"    = "1"
  }

  tags = {
    Environment = "Production"
    Project     = "Microfrontend"
    Component   = "Frontend"
  }
}

# Configuración de Application Insights para el frontend
resource "azurerm_application_insights" "frontend_insights" {
  name                = "frontend-insights-${random_string.suffix.result}"
  location           = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
}

# Configuración de CDN para el frontend
resource "azurerm_cdn_profile" "frontend_cdn" {
  name                = "mcf-frontend-cdn-${random_string.suffix.result}"
  location           = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "frontend_cdn_endpoint" {
  name                = "mcf-frontend-cdn-endpoint-${random_string.suffix.result}"
  profile_name        = azurerm_cdn_profile.frontend_cdn.name
  location           = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  origin {
    name      = "frontend-origin"
    host_name = azurerm_linux_web_app.frontend.default_hostname
  }
} 