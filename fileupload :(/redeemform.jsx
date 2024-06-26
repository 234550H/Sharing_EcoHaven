import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/redeemform.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, Input } from '@mui/material';
import { styled } from '@mui/system';
import * as Yup from 'yup';

const Label = styled('label')({
    marginLeft: '100px',
    marginBottom: '-10px',
    fontSize: '16px',
    fontWeight: 'bold',
});


const StyledInput = styled(Input)`
    margin-left: 90px;
    padding: 10px;
    margin-bottom: 8px;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 10px;

    &:hover {
        border-color: #14772B;
`;

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z ]*$/, 'Name should only contain alphabetic characters and spaces'),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .matches(/@/, 'Email must contain "@"'),
});

function RedeemForm() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Fetch product details based on productId
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/eco/product-detail/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (isSubmitted) {
            setTimeout(() => {
                window.location.href = '/successcollect';
            }, 400);
        }
    }, [isSubmitted]);

    const generateCollectionId = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    return (
        <div className='redeemform'>
            <Navbar />

            <div className="headbanner">
                <img src="../src/assets/images/banner.png" alt="Banner" />
                <h1>Redeem Form</h1>
            </div>

            <div className="back">
                <a href='/redemptionshop'><img src="../src/assets/images/icons/back.png" alt="back" /></a>
                <p><a href='/redemptionshop'>Back to redemption shop</a></p>
            </div>

            <div className="form-section">
                <h2 className='info'>Information</h2>
                {product && (
                    <Formik
                        initialValues={{ name: '', phoneNumber: '', email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            const collectionId = generateCollectionId();
                            
                            // Save collection ID to localStorage
                            localStorage.setItem('collectionId', collectionId);

                            setIsSubmitted(true);
                            setSubmitting(false);
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className='product'>
                                    <p>Product Name: {product.prodName}</p>
                                    <p>Leaves: {product.leaves}</p>
                                </div>

                                <FormControl fullWidth>
                                    <Label>Name <span className='asterisk'>*</span></Label>
                                    <Field name="name" as={StyledInput} placeholder="Name" />
                                    <ErrorMessage name="name" component="div" className="error-message" />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Label>Phone Number <span className='asterisk'>*</span></Label>
                                    <Field name="phoneNumber" as={StyledInput} placeholder="Phone number" />
                                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Label>Email <span className='asterisk'>*</span></Label>
                                    <Field name="email" as={StyledInput} placeholder="Email" />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </FormControl>

                                <div className='detail'>
                                    <h2>Please remember the collection details</h2>
                                    <p>Potong Pasir Community Club</p>
                                    <p>6 Potong Pasir Ave 2, Singapore 358361</p>
                                    <p>Monday - Friday: <span className='time'>11:00am - 8:00pm</span></p>
                                    <p>Saturday & Sunday: <span className='time'>12:00pm - 4:00pm</span></p>
                                    <p className='extra'>*please collect within a week</p>
                                </div>

                                <button type="submit" className='submitbutton'>
                                    Redeem now
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default RedeemForm;
