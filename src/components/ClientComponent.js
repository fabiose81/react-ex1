import React from 'react'
import ReactDOM from 'react-dom';
import { Form, FormGroup, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap'
import { Request } from '../rest/Request'
import ModalComponent from './ModalComponent'
import './ClientComponent.css'

class ClientComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                list: {
                    page: 0,
                    total_pages: 0,
                    data: []
                },
                session: 1,
                way: null,
                modal: false,
                request: true,
                person: {
                    id: 0,
                    first_name: null,
                    last_name: null,
                    avatar: null
                }
            };
    }

    doRequest = (page, way) => {
        this.state.way = way;
        if (way != null)
            if (way == 'next')
                this.state.session += 3;
            else
                this.state.session -= 3;

        Request('users?page='.concat(page))
            .then(result => {
                this.state.list.page = result.page;
                this.state.list.total_pages = result.total_pages;
                this.state.list.data = result.data;

                this.renderList();
            });
    }

    showModal = (_person) => {
        this.setState(state => ({
            modal: !this.state.modal,
            person: _person
        }));
    }

    renderList = () => {
        let data = this.state.list.data;
        let listGroup = [];
        let pagination = [];

        let total = this.state.list.total_pages;
        let page = this.state.list.page;
        let session = this.state.session;
        let way = this.state.way;

        if (data.length > 0) {
            this.state.list.data.map(function (value, index) {
                listGroup.push(<ListGroupItem href="#"
                    onClick={() => {
                        this.state.request = false;
                        this.showModal(data[index])
                    }
                    }
                    key={index}> {value.first_name}</ListGroupItem>);
            }, this);
        }
        else {
            listGroup.push(<ListGroupItem key={0}>No results</ListGroupItem>);
        }

        if (total > 1) {
            let _index = (way == null ? session > 1 ? session : page - (page - 1) : page);

            for (let index = _index; index <= _index + 2; index++) {
                let active = (index == page ? true : false)

                pagination.push(<PaginationItem active={active} key={index}><PaginationLink href="#" onClick={() => this.doRequest(index, null)}>{index}</PaginationLink></PaginationItem>);

                if (index == total)
                    break;
            }

            if (_index > 1)
                pagination.unshift(<PaginationItem key={_index - 3}><PaginationLink previous href="#" onClick={() => this.doRequest(_index - 3, 'previous')} /></PaginationItem>);

            if (_index < total)
                pagination.push(<PaginationItem key={_index + 3}><PaginationLink next href="#" onClick={() => this.doRequest(_index + 3, 'next')} /></PaginationItem>);

            ReactDOM.render(pagination, document.getElementById('pagination'));
        }

        ReactDOM.render(listGroup, document.getElementById('list-group'));
    }

    render() {
        if (this.state.request)
            this.doRequest(1, null)

        return (
            <Container className="cs-container">          
                    <Row>
                        <Col>
                            <ListGroup id="list-group"></ListGroup>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Pagination size="lg" id="pagination" className="cs-pagination"></Pagination>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ModalComponent modal={this.state.modal} showModal={this.showModal} person={this.state.person} />
                        </Col>
                    </Row>
          
            </Container>

        );
    }
}

export default ClientComponent;