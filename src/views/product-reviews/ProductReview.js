import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the carousel styles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdFileUpload } from 'react-icons/md';
import { useToast } from '../../hooks';
import { AxiosClient } from '../../services';
import { transformError } from '../../helpers';

export const ProductReview = ({ reviews, prodId }) => {
  const [productReview, setProductReview] = useState({
    email: '',
    description: '',
    rating: 0,
    images: [],
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [expandedAccordion, setExpandedAccordion] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!productReview.email) {
      setValidationError('please provide email');
      return;
    }
    if (!productReview.description) {
      setValidationError('description is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(productReview.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    setValidationError('');

    const formData = new FormData();
    formData.append('star', productReview.rating);
    formData.append('review', productReview.description);
    formData.append('product_id', prodId);

    productReview.images.forEach((image, index) => {
      formData.append(`image[${index}][image]`, image);
    });

    try {
      setLoading(true);
      const result = await AxiosClient.post('api/review/post', formData);
      if (result?.data?.success) {
        toast.success('Reviewe submitted successfully');
      } else {
        toast.error('Failed to submit review');
      }
    } catch (err) {
      toast.error(transformError(err).message);
    } finally {
      setLoading(false);
      setProductReview({
        email: '',
        description: '',
        rating: 0,
        images: [],
      });
      setSelectedFiles([]);
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : '');
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Limit to 2 images
    if (files.length > 2) {
      setValidationError('You can only select up to 2 images.');
      return;
    }
    setSelectedFiles(files.map(file => file.name));
    setProductReview({ ...productReview, images: files });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductReview({ ...productReview, [name]: value });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container maxWidth={'lg'} sx={{ margin: '2rem auto 5rem auto' }}>
      <Typography variant='h5' textAlign='start' marginBottom='1rem'>
        Customer Reviews
      </Typography>

      <Accordion
        expanded={expandedAccordion === 'allReviews'}
        onChange={handleAccordionChange('allReviews')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h6' textAlign='start' marginBottom='1rem'>
            All Reviews
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {reviews && reviews.length > 0 ? (
              <Carousel responsive={responsive}>
                {reviews.map((review, index) => (
                  <Stack key={index} direction='column' spacing={1}>
                    <p>{review.review.review}</p>
                    <Rating
                      name='read-only'
                      defaultValue={review.review.star}
                      readOnly
                    />

                    <Stack direction='row' spacing={1}>
                      {review.image_review.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${image.image_url})`,
                            height: '10rem',
                            width: '8rem',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Carousel>
            ) : (
              'No reviews yet'
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedAccordion === 'leaveReview'}
        onChange={handleAccordionChange('leaveReview')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography variant='h6'>Leave Review</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            maxWidth={500}
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Stack direction={'column'} spacing={2}>
              <TextField
                label='Email'
                variant='outlined'
                name='email'
                value={productReview.email}
                onChange={handleChange}
              />
              <TextField
                label='Description'
                multiline
                rows={4}
                variant='outlined'
                name='description'
                value={productReview.description}
                onChange={handleChange}
              />
              <Rating
                name='rating'
                label='Rating'
                value={productReview.rating}
                max={5}
                onChange={(event, newValue) =>
                  setProductReview({ ...productReview, rating: newValue })
                }
                sx={{maxWidth:"8rem"}}
              />
              <input
                type='file'
                accept='image/jpeg, image/png, image/jpg'
                multiple
                ref={fileInputRef}
                hidden
                onChange={handleImageChange}
              />

              <Button
                variant='outlined'
                onClick={handleImageUploadClick}
                sx={{ maxWidth: '20vw' }}
                startIcon={<MdFileUpload />}
              >
                Upload Image/s
              </Button>
              {selectedFiles.length > 0 && (
                <Typography color='black'>Selected Files: {selectedFiles.join(', ')}</Typography>
              )}
              {validationError && (
                <Typography color='error'>{validationError}</Typography>
              )}

              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
