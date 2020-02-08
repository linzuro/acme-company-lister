const root = document.querySelector('#root')

const { render } = ReactDOM;

const companiesAPI = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')

const productsAPI = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')

const p = Promise.all([companiesAPI, productsAPI])
    .then(results => {
        return {
            companies: results[0].data,
            products: results[1].data
        }
    })

const Nav = ({ companies, products, view }) => {
    const companiesLink = React.createElement('a', { key: 'companies', href: '#companies', className: (view === 'companies' || view === '' ? 'selected': '')}, `Companies(${companies.length})`)
    const productsLink = React.createElement('a', { key: 'products', href: '#products', className: (view === 'products' ? 'selected': '')}, `Products(${products.length})`)
    return React.createElement('div', {className: 'navBar'}, companiesLink, productsLink)
}

const CompanyList = ({companies}) => {
    const companyList = companies.map((company, idx) => {
        return React.createElement('li', {key: idx, className: 'companyItem'}, `${company.name}`)
    })
    return React.createElement('ul', null, companyList)
}

const ProductList = ({products}) => {
    const productList = products.map((product, idx) => {
        return React.createElement('li', {key: idx, className: 'productItem'}, `${product.name} - ${product.description}`)
    })
    return React.createElement('ul', null, productList)
}



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            companies: [],
            products: [],
            view: ''
        }
    }

    componentDidMount() {
        p.then(result=>this.setState({
            companies:result.companies,
            products:result.products, 
            view: window.location.hash.slice(1)
        }))

        window.addEventListener('hashchange', () => {
            this.setState({view: window.location.hash.slice(1)})
        })
    }

    render() {
        const { companies, products, view } = this.state;

        const nav = React.createElement(Nav, { companies, products, view })

        let chosenView;

        if (view === 'companies' || view === '') {
            chosenView = React.createElement(CompanyList, { companies })
        } else if (view === 'products') {
            chosenView = React.createElement(ProductList, { products })
        }

        return React.createElement('div', null, nav, chosenView)
    }
}

render(React.createElement(App), root)

