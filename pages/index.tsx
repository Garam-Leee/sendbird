export default function Index() {
  return (
    <div>
      Hello world!
      <p>{process.env.NEXT_PUBLIC_DEPLOY_MODE}</p>
      <p>{process.env.NEXT_PUBLIC_CRM_API_DOMAIN}</p>
    </div>
  );
}
