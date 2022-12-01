import Layout from "../components/global/layout"
import PrimaryButton from "../components/util/primary-button"

export default function NotFound() {
  return (
    <Layout>
      <div className="py-52">
        <div className="container text-center">
          <h1 className="md:text-4xl text-2xl text-center mb-10">Uh Oh.. Page Not Found 😭</h1>
          <div className="text-xl">
            <p>It was either moved, deleted, or lost in the multiverse...</p>
            <p>Not to worry, we can get you back home so you can explore any of our other pages!</p>
          </div>
          <div className="mt-10">
            <PrimaryButton
              buttonLabel="Return Home"
              buttonLink="/"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}