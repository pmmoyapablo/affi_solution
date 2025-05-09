output "backend_url" {
  description = "URL of the backend App Service"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "frontend_url" {
  description = "URL of the frontend App Service"
  value       = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "frontend_cdn_url" {
  description = "URL of the frontend CDN endpoint"
  value       = "https://${azurerm_cdn_endpoint.frontend_cdn_endpoint.host_name}"
}

output "backend_insights_key" {
  description = "Application Insights key for the backend"
  value       = azurerm_application_insights.backend_insights.instrumentation_key
  sensitive   = true
}

output "frontend_insights_key" {
  description = "Application Insights key for the frontend"
  value       = azurerm_application_insights.frontend_insights.instrumentation_key
  sensitive   = true
} 