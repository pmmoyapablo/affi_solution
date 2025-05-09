output "ecs_id" {
  description = "ID that identifies the cluster."
  value       = aws_ecs_cluster.finkargo.id
}