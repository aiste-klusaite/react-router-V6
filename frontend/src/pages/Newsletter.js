import { NewsletterSignup } from '../components/NewsletterSignUp';
import { PageContent } from '../components/PageContent';

export const NewsletterPage = () => {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
};