FROM fauna/faunadb:4.15.0

FROM gitpod/workspace-full:latest  
COPY --from=0 ./ ./