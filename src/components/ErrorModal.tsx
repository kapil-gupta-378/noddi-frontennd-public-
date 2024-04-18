import { Modal } from 'react-bootstrap'

const ErrorModal = ({ errors, setErrors }) => {
  const handleClose = () => setErrors(null)

  return (
    <Modal show={errors !== null} onHide={handleClose} centered={true} className={'error-modal'}>
      <Modal.Header closeButton>
        <Modal.Title>Errors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors !== null && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default ErrorModal
