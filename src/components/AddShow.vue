<template>
    <div id="appM" class="hero">
        <h3 class="vue-title"><i class="fa fa-film" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">

                    <form @submit.prevent="submit">
                        <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
                            <label class="form__label">Enter Movie Title</label>
                            <input class="form__input" v-model.trim="$v.title.$model"/>
                        </div>
                        <div class="error" v-if="!$v.title.required">Title is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.season.$error }">
                            <label class="form-control-label" name="season">Set the season</label>
                            <input class="form__input" type="number" v-model.trim="season"/>
                        </div>
                        <div class="error" v-if="!$v.season.required">Season is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.released.$error }">
                            <label class="form-control-label" name="released">Show release year</label>
                            <input class="form__input" type="number" v-model.trim="released"/>
                        </div>
                        <div class="error" v-if="!$v.released.minValue">release year must be after 1888 </div>
                        <div class="error" v-if="!$v.released.required">released year is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.cost.$error }">
                            <label class="form-control-label" name="cost">Set cost of Show</label>
                            <input class="form__input" type="number" v-model.trim="cost"/>
                        </div>
                        <div class="error" v-if="!$v.cost.required">Stock is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.stock.$error }">
                            <label class="form-control-label" name="stock">Set amount in stock</label>
                            <input class="form__input" type="number" v-model.trim="stock"/>
                        </div>
                        <div class="error" v-if="!$v.stock.required">Stock is Required</div>
                        <p>
                            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add Show</button>
                        </p>
                        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Adding!</p>
                        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
                        <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
                    </form>
                </div><!-- /col -->
            </div><!-- /row -->
        </div><!-- /container -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'
    import showService from "@/services/showService";
    // eslint-disable-next-line no-unused-vars
    import { required, minValue,  } from 'vuelidate/lib/validators'

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    })

    Vue.use(Vuelidate)
    Vue.use(VueSweetalert)

    export default {
        name: "AddShow",
        data () {
            return {
                messagetitle: ' add Show ',
                title: '',
                season: '',
                released: 1888,
                cost: 0,
                stock: 0,
                movies: {},
                submitStatus: null
            }
        },
        validations: {
            title:{
                required
            },
            season: {
                required
            },
            released:{
                required,
                minValue: minValue(1888)
            },
            cost: {
                required
            },
            stock:{
                required
            }
        },
        methods: {
            submit () {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                        var show = {
                            title: this.title,
                            season: this.season,
                            released: this.released,
                            cost: this.cost,
                            stock: this.stock
                        }
                        this.show = show
                        console.log('Submitting in ShowForm : ' + JSON.stringify(this.show, null, 5))
                        this.addMovie(this.show)
                    }, 500)
                }
            },
            addMovie: function (show) {
                console.log('submitShow!')
                console.log('Submitting in submitShow : ' + show)
                showService.postShow(show)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            }
        }
    }

</script>

<style scoped>
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }
    #appM {
        width: 95%;
        margin: 0 auto;
    }
    .required-field > label::after {
        content: '*';
        color: red;
        margin-left: 0.25rem;
    }
    .addMovie-form .form-control-label.text-left{
        text-align: left;
    }

    label {
        display: inline-block;
        width: 540px;
        text-align: left;
        font-size: x-large;
    }
    .typo__p {
        width: 540px;
        font-size: x-large;
    }
    .btn1 {
        width: 300px;
        font-size: x-large;
    }
    p {
        margin-top: 20px;
    }

    input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
        width: 540px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #157ffb;
        color: whitesmoke;
    }

    .error:focus {
        outline-color: #ffa519;
    }
</style>
