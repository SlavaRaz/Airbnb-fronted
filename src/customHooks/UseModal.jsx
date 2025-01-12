import { useState } from 'react'
import { CloseBtn } from '../cmps/ui/buttons/close-btn'

const Modal = ({ isOpen, component: Component, closeModal }) => {
  if (!isOpen || !Component) return null
  return (
    <div className='modal'>
      <div className='close-modal-btn-container'>
        <CloseBtn onClick={closeModal} />
      </div>
      <div className='content-container'>
        {/* Render the dynamic component */}
        {typeof Component === 'function' ? <Component /> : Component}
      </div>
    </div>
  )
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState(null)

  function openModal(componentToOpen) {
    setIsOpen(true)
    setComponent(() => componentToOpen) // Set the component
  }

  function closeModal() {
    setIsOpen(false)
    setComponent(null)
  }

  return {
    isOpen,
    component,
    openModal,
    closeModal,
    Modal: (props) => (
      <Modal
        isOpen={isOpen}
        component={component}
        closeModal={closeModal}
        {...props}
      />  
    )
  }
}

