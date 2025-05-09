import React, { useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/Inputs';
import Button from '../../components/Button';
import Editor from '../../Editor';
import TextArea from '../../components/Inputs/TextArea';
import { writer } from '../../assets/index'
import { usePost } from '../../hooks/usePost';
import { toast } from 'sonner';
import { MediumSpinLoader } from '../../components/Loader/spinLoader';
import onboardingSchema, { onboardingDefaultValues } from '../../schemas/onboardingSchema';
import { Checkbox } from '../../components/Inputs/checkbox';
import { FileUpload } from '../../components/Inputs/fileUpload';
import { useNavigate } from 'react-router-dom';
import TermsAndConditions from '../../components/TermsAndConditions';

const WriterOnboarding = () => {
  const methods = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: onboardingDefaultValues
  });
  const { handleSubmit, control, watch, setValue } = methods;
  const navigate = useNavigate();

  const { post: postApplication } = usePost('/writer/apply');
  const { post: postSampleBlog } = usePost('/sampleBlog/blogs?type=sample');

  const [submitting, setSubmitting] = useState(false);
  const sampleLinks = watch('sampleWorkLinks');

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const topics = data?.topics.split(',').map(t => t.trim()).filter(Boolean);
      const sampleWorkLinks = data.sampleWorkLinks
        ? data.sampleWorkLinks.split(',').map(link => link.trim()).filter(Boolean)
        : [];

      const formPayload = {
        bio: data.bio,
        topics,
        sampleWorkLinks,
        socialLinks: {
          twitter: data.twitter || null,
          linkedin: data.linkedin || null,
          github: data.github || null
        },
        reasonToWrite: data.reasonToWrite,
        acceptTerms: data.acceptTerms,
      };

      const applicationRes = await postApplication(formPayload);
      if (applicationRes?.error) throw new Error(applicationRes.error);

      if (sampleWorkLinks.length === 0 && sampleBlogContent) {
        const blogForm = new FormData();
        blogForm.append("title", data.title);
        blogForm.append("summary", data.summary);
        blogForm.append("content", data.content);
        blogForm.append("cover", data.cover);

        const blogRes = await postSampleBlog(blogForm);
        if (blogRes?.error) throw new Error(blogRes.error);
      }

      toast.success('Application submitted successfully!');
      navigate('/');
      methods.reset();
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTermClick = (e) => {
    e.preventDefault();
    setIsOpen(true)
  }

  return (
    <div className={`flex gap-6 border border-blue dark:border-golden mx-2 my-4 md:mx-20 rounded-2xl p-6`}>
      {submitting && <div className='fixed w-screen h-screen top-0 left-0 z-[1000] bg-black/50 flex items-center justify-center'>
        <MediumSpinLoader />
      </div>}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Writer Application Form</h2>

          <TextArea inputClass='mb-4 rounded-md p-2 bg-neutral-100 dark:bg-neutral-900' name="bio" control={control} label="Bio" placeholder="Tell us about yourself..." />
          <Input name="topics" control={control} label="Topics You are Interested" placeholder="E.g., Tech, Travel, Finance" required />
          <Input name="sampleWorkLinks" control={control} label="Sample Work Links" placeholder="Comma-separated URLs" />

          <Input name="twitter" control={control} label="Twitter" placeholder="https://twitter.com/you" />
          <Input name="linkedin" control={control} label="LinkedIn" placeholder="https://linkedin.com/in/you" />
          <Input name="github" control={control} label="GitHub" placeholder="https://github.com/you" />

          <TextArea inputClass='mb-4 rounded-md p-2 bg-neutral-100 dark:bg-neutral-900' name="reasonToWrite" control={control} label="Why do you want to write?" placeholder="Your motivation..." rows={3} required />
          {(!sampleLinks || sampleLinks.length === 0) && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Write a Sample Blog</h3>
              <Input name="title" label="Title" control={control} />
              <Input name="summary" label="Summary" control={control} />
              <FileUpload
                name="cover"
                control={control}
                label="Cover Image"
                accept="image/*"
                maxSize={2 * 1024 * 1024} // 2MB
              />
              <Editor
                value={watch("content")}
                onChange={(val) => setValue("content", val, { shouldValidate: true })}
              />
            </div>
          )}

          <Checkbox
            name="acceptTerms"
            className='mt-4'
            control={control}
            label={<p className='inline-block'>I agree to the <span onClick={handleTermClick} className="underline cursor-pointer text-blue dark:text-golden">terms and conditions</span></p>}
            required
          />

          <Button
            type="submit"
            className={`mt-6 px-4 py-2 rounded-md ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={submitting ? 'Submitting...' : 'Submit Application'}
          />
        </form>
      </FormProvider>
      <img className="aspect-[2/3] rounded-2xl shrink-0 h-[calc(100vh-100px)] hidden sm:block sticky top-20"
        src={writer}
        alt="" />
      <TermsAndConditions
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userRole={'writer'}
      />
    </div>
  );
};

export default WriterOnboarding;
