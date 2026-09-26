import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-primary lg:text-7xl">
              404
            </h1>
            <p className="text-textcolor mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Something's missing.
            </p>
            <p className="text-textcolor mb-4 text-base font-light">
              Sorry, we can't find that page. You'll find lots to explore on the dashboard.{" "}
            </p>
            <Link to={"/"} className="btn-primary mx-auto w-fit px-9">
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
