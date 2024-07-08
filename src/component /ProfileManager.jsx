import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist/webpack';

// Set workerSrc to load the worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;


const ProfileManager = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [resume, setResume] = useState(null);
    const [profile, setProfile] = useState({});
    const [resumeUrl, setResumeUrl] = useState(null);

    const onSubmit = data => {
        setProfile(data);
    };


    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
            const reader = new FileReader();
            reader.onload = function(e) {
                setResumeUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    return (
        <Container>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Career Consultancy</h1>
                <Input
                    type="text"
                    placeholder="Full Name"
                    {...register('fullName', {required: true})}
                />
                {errors.fullName && <Error>Full Name is required</Error>}

                <Input
                    type="email"
                    placeholder="Email"
                    {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                />
                {errors.email && <Error>Valid email is required</Error>}

                <TextArea
                    placeholder="Professional Experiences"
                    {...register('experience', {required: true})}
                />
                {errors.experience && <Error>Experience is required</Error>}

                <TextArea
                    placeholder="Skills"
                    {...register('skills', {required: true})}
                />
                {errors.skills && <Error>Skills are required</Error>}

                <Input type="file" onChange={handleResumeUpload} accept={'.pdf'}/>

                <Button type="submit">Submit</Button>
            </Form>

            {profile && <ProfileDisplay>
                <h2>Profile Information</h2>
                <p><strong>Name:</strong> {profile.fullName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Experience:</strong> {profile.experience}</p>
                <p><strong>Skills:</strong> {profile.skills}</p>
                {resume && <p><strong>Resume:</strong> {resume.name}</p>}
                {resumeUrl && (
                    <PDFViewer>
                        <embed src={resumeUrl} width="100%" height="500px"/>
                    </PDFViewer>
                )}
            </ProfileDisplay>}
        </Container>
    );
};

export default ProfileManager;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    height: 100%;
    overflow-x: hidden;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
      overflow: hidden;
      height: 100vh;
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    gap: 15px;
`;

const Input = styled.input`
    margin-bottom: 10px;
    width: 50%;
    border: solid 3px #bd7ce8;
    border-radius: 20px;
    outline: none;
    padding: 10px;
    font-family: 'Sniglet', cursive;
    font-size: 1em;
    color: #676767;
    transition: border 0.5s;
    -webkit-transition: border 0.5s;
    -moz-transition: border 0.5s;
    -o-transition: border 0.5s;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    //@media (min-width: 1024px) {
    //    width: 500px;
    //}
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    width: 50%;
    border: solid 3px #bd7ce8;
    border-radius: 20px;
    outline: none;
    padding: 10px;
    font-family: 'Sniglet', cursive;
    font-size: 1em;
    color: #676767;
    transition: border 0.5s;
    -webkit-transition: border 0.5s;
    -moz-transition: border 0.5s;
    -o-transition: border 0.5s;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 1rem;
    width: 50%;
    background-color: #bd7ce8;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 10px;
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const ProfileDisplay = styled.div`
    width: 100%;
    height: 100%;
    background: #bd7ce8;
    color: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    @media (min-width: 1024px) {
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
    }

`;

const PDFViewer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 20px;
    embed {
    width: 80%;
    height: 100%;
    border: none;
      
  }
    @media (min-width: 1024px) {
        height: 500px;
    }
   
`;