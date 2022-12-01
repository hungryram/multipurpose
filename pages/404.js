import Header from "../components/templates/header"

export default function NotFound() {
    return (
      <>
      <Header 
        title=""
      />
          <div className="py-52">
              <div className="container text-center">
                  <h1 className="md:text-4xl text-2xl text-center mb-10">Uh Oh.. Page Not Found 😭</h1>
                  <p>It was either moved, deleted, or lost in the multiverse...</p>
                  <p>Not to worry, view any of our other page links!</p>
              </div>
          </div>
      </>
    )
  }