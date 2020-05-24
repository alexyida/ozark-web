import React, { Component } from "react";

import { Modal, ModalBody } from "baseui/modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          <Modal
            closeable
            animate
            isOpen={this.state.error}
            onClose={() => this.setState({ error: null })}
          >
            <ModalBody>
              {this.state.error && this.state.error.message}
            </ModalBody>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
