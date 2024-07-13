export default function Jumbotron({ title, subTitle = "Welcome to React Ecommerce Store" }) {
    return <div className="container-fluid bg-primary">
        <div className="row">
            <div className="col text-center p-4 bg-light">
                <h1>{title}</h1>
                <p className="lead">{subTitle}</p>
            </div>
        </div>
    </div>
}

