import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import $ from 'jquery'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products:[]
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        this.getProducts()
    }
    
    getProducts() {
        $.ajax({
          type: "GET",
          url: 'http://localhost:3001/product/get/'
        }).then(resp => {
          console.table(resp)
          this.setState({
            products: resp
          })
        })
      }


    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3001/product/create/',
            data: product
          }).then(() => {
            this.getProducts()
          })
        }
    
    handleDestroy(productId) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:3001/product/delete/${productId}`
        }).then(() => {
            this.getProducts()
        })
    }
    
    // handleUpdateStatus = productId => {
    //     $.ajax({
    //       type: 'PUT',
    //       url: `http://localhost:3001/product/update/${productId}`
    //     }).then(() => {
    //       this.getProducts()
    //     })
    // }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}></ProductTable>
                <ProductForm
                    onSave={this.handleSave}></ProductForm>
            </div>
        )
    }   
}

export default Products