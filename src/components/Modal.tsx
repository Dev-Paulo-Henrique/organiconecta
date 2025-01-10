// Paulo Henrique

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AddProductForm } from './AddProductForm'

interface ViewerProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export function Viewer({ isOpen, onClose, title }: ViewerProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <AddProductForm title={title} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
