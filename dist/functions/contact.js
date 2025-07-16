import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendContactEmail = async (formData) => {
  try {
    // Debug: Log the IDs being used
    console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing');
    
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company || '',
      service: formData.service || '',
      message: formData.message
    };

    console.log('Sending email with params:', templateParams);

    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS Error Details:', error);
    return { success: false, error: error.message };
  }
};
