FROM gitpod/workspace-base:latest

# Install custom tools, runtime, etc.
# base image only got `apt` as the package manager
# install-packages is a wrapper for `apt` that helps skip a few commands in the docker env.
RUN sudo docker pull fauna/faunadb:4.15.0