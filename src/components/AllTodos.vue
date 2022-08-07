<template>
    <section class="hero-section">
        <div v-if="!data_length">
            <div>
                <div>
                    <div class="card-my card-box create-card card-text">
                        <div>
                            <h1>Empty Todos List Press + </h1>
                            <h3> To Create Your Todos </h3>
                            <br>
                            <br>
                            <button type="button" class="btn-btn-edit" @click.prevent="showModalAdd = true"> Create
                                Todos More </button>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL CREATE EMPTY -->
        <div v-else>
            <h1 class="title-main">This Is My All Todos</h1>
            <button type="button" class="btn-btn-edit" @click="showModalAdd = true"> Create Todos More </button>
            <div v-if="data_length">
                <div v-for="alltodo in alltodos" :key="alltodo._id">
                    <div class="card-box">
                        <div class="card-text">
                            <h3 class="card-text"> Title </h3>
                            <h5 class="card-text text-title">{{ alltodo.title }}</h5>
                            <h3 class="card-text text-description"> Description </h3>
                            <h5 class="text-description">{{ alltodo.description }}</h5>

                            <h4 class="text-date">Date: {{ alltodo.updatedAt }} </h4>
                        </div>
                        <div class="btn-box">
                            <button class="btn-btn-edit" type="button"
                                @click.prevent="showModal = true; setVal(alltodo)"> Edit
                            </button>
                            <button class="btn-btn-delete" type="button" @click.prevent="deleteCardID(alltodo._id)">

                                Delete </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <!-- Show Modal Add More -->
        <!-- app -->
        <div id="app" class="modal-vue">
            <!-- overlay -->
            <div class="overlay" v-if="showModalAdd" @click="showModalAdd = false"></div>

            <!-- modal -->
            <div class="modal" v-if="showModalAdd">
                <button class="close" @click="showModalAdd = false">x</button>
                <div>
                    <form>
                        <br>
                        <h5>Title</h5>
                        <input type="text" name="title" class="my-text-box" v-model="card.title" required />
                        <br>
                        <h5>Description</h5>
                        <textarea name="description" cols="50" rows="5" v-model="card.description" required />
                        <br>
                        <button type="button" class="btn-add" @click.prevent="CreateMore">Submit</button>

                    </form>
                </div>
            </div>

        </div>

        <!-- Show Modal Add More -->



        <!-- สร้าง handle modal ส่งค่า เรียก modal show , data  -->
        <!-- Show Modal มีการแก้ไข และ ลบ หรือ ไม่มี Action -->
        <div class="modal-vue">
            <div class="overlay" v-if="showModal" @click="showModal = false"></div>
            <!-- modal -->
            <div class="Card-Cover">
                <div class="card">
                    <!-- {{ (this.valueModal.title) }}  To Check Realtime 2Way Binding -->
                    <div class="modal" v-if="showModal">
                        <button class="btn-btn-delete close" @click="showModal = false">Close</button>
                        <h2>Edit Tilte</h2>
                        <input type="text" v-model="this.valueModal.title" />
                        <p>Description</p>
                        <textarea type="text" v-model="this.valueModal.description" />
                        <br />
                        <br />
                        <div>
                        <button type="button" class="btn-add" @click="EditCardId">save</button>
                        <button type="button" class="btn-btn-delete"  @click="showModal = false"> Close </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->

    </section>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            card: [
                {
                    title: "",
                    description: ""
                }
            ],
            data_length: false,
            alltodos: [],

            EditDetial: [
                {
                    title: "",
                    description: "",
                },
            ],
            showModal: false,
            showModalAdd: false,

            valueModal: {},

        };
    },

    created() {
        let token = sessionStorage.getItem("jwttoken");
        let apiURL = `https://candidate.neversitup.com/todo/todos`;
        axios({
            method: "get",
            url: apiURL,
      /* step 1 */ headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                /*  this.editTodo = response.data._id; */
                if (response.status === 200) {
                    this.alltodos = response.data

                    if (this.alltodos.length !== 0) this.data_length = true
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    methods: {
        setVal(val) {
            this.valueModal = val;
        },
        deleteCardID(id) {
            let apiURL = `https://candidate.neversitup.com/todo/todos/${id}`;
            let token = sessionStorage.getItem("jwttoken");
            let indexOfarrayItem = this.alltodos.findIndex((i) => i._id === id);
            if (window.confirm('Are You Sure To Delete ')) {
                axios({
                    method: "delete",
                    url: apiURL,
          /* step 1 */ headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(() => {
                        this.alltodos.splice(indexOfarrayItem, 1);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        EditCardId() {
            const apiURL = `https://candidate.neversitup.com/todo/todos/${this.valueModal._id}`;
            const token = sessionStorage.getItem("jwttoken");
            const _data = {
                title: this.valueModal.title,
                description: this.valueModal.description
            }
            axios({
                method: 'put',
                url: apiURL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: _data
            }).then((res) => {
                this.showModal = false;
                console.log(res);
            })
        },
        CreateMore() {
            const token = sessionStorage.getItem('jwttoken')
            const _data = {
                title: this.card.title,
                description: this.card.description
            }
            const apiURL = `https://candidate.neversitup.com/todo/todos`
            if (this.card.title === null ||
                this.card.title === '' ||
                this.card.title === undefined ||
                this.card.description === null ||
                this.card.description === '' ||
                this.card.description === undefined
            ) {
                alert('Please Fill The Form');
                return false;
            } else {
                axios({
                    method: 'post',
                    url: apiURL,
               /* step 1 */ headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
               /* step 2  */ data: _data
                })
                    .then((response => {
                        this.title = response.data.title,
                            this.decription = response.data.description,
                            this.showModalAdd = false;
                        this.card.title = '',
                            this.card.decription = ''
                        console.log(response);




                    })
                    )
                    .catch(function (error) {
                        console.log(error);
                    });



            }


        }

    },
};
</script>


<style scoped>
.hero-section {
    position: relative;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    background-size: cover;
    height: 100vh;
}

.create-card {
    position: relative;
    top: 50px;
}

.create-card {
    margin: auto;
    border: 1px solid blanchedalmond;
    width: 500px;
    height: 200px;
    border-radius: 15px;
}

.card-box {
    background-color: aliceblue;
    width: 350px;
    height: 200px;
    border: 2px solid #ffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 25px 25px;

}



.card-box:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.btn-box {
    display: flex;
    flex-direction: columns;
    align-items: flex-end;
    justify-content: end;

}


.btn-add {
    background-color: #4a77d4;
    border: none;
    border-radius: 15px;
    color: white;
    padding: 5px 15px;
    margin: 5px 5px 5px 5px;
    cursor: pointer;
}

.btn-btn-edit {
    background-color: #FFCC70;
    border: none;
    border-radius: 15px;
    color: white;
    padding: 5px 15px;
    margin: 5px 5px 5px 5px;
    cursor: pointer;
}

.btn-btn-delete {
    background-color: rgb(234, 80, 13);
    border: none;
     border-radius: 15px;
    color: white;
    padding: 5px 15px;
    margin: 5px 5px 5px 5px;
    cursor: pointer;
}

.card-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

/* MODAL CSS */
.modal-vue .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}



.modal-vue .modal {
    position: absolute;
    top: 20px;
    left: 90px;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: aliceblue;
    min-width: 500px;
    height: auto;
    border: 2px solid #ffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.modal-vue .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.modal-vue .modal {
    width: auto;
}


.modal-vue .close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.Card-Cover {
    width: 500px;
}


.btn-primary {
    background-color: #4a77d4;
    background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4);
    background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#6eb6de), to(#4a77d4));
    background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
    background-image: -o-linear-gradient(top, #6eb6de, #4a77d4);
    background-image: linear-gradient(top, #6eb6de, #4a77d4);
    background-repeat: repeat-x;
    filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);
    border: 1px solid #3762bc;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>