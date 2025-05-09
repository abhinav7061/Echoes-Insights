import React from 'react';
import Modal from '../Modal';
import About from '../../pages/About';

const AboutModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="About Our Platform"
            size="lg"
            animation="slide"
            ariaLabelledby="about-modal-title"
            overlayClassName="bg-black/50 backdrop-blur-sm"
        >
            <About />
        </Modal>
    );
};

export default AboutModal;