<template>
            <form @submit.prevent="submit">
                        <div class="form-group" :class="{ 'form-group--error': $v.author.$error }">
                            <label class="form__label">Enter Author Name</label>
                            <input class="form__input" v-model.trim="$v.author.$model"/>
                        </div>
                        <div class="error" v-if="!$v.author.required">Title is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.titleID.$error }">
                            <label class="form__label">title ID</label>
                            <input class="form__input" v-model.trim="$v.titleID.$model"/>
                        </div>
                        <div class="error" v-if="!$v.titleID.required">TitleID is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.reviewedTitle.$error }">
                            <label class="form__label">Film Title</label>
                            <input class="form__input" v-model.trim="$v.reviewedTitle.$model"/>
                        </div>
                        <div class="error" v-if="!$v.reviewedTitle.required">Title is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.reviewt.$error }">
                            <label class="form__label">Write Review</label>
                            <input id="rev" class="form__input" v-model.trim="$v.reviewt.$model"/>
                        </div>
                        <div class="error" v-if="!$v.reviewt.required">Title is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.rating.$error }">
                            <label class="form-control-label" name="cost">Set Rating</label>
                            <input class="form__input" type="number" v-model.trim="rating"/>
                        </div>
                        <div class="error" v-if="!$v.rating.required">Rating is Required</div>

                        <p>
                            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ reviewBtnTitle }}</button>
                        </p>
                        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Adding!</p>
                        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
                        <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
                    </form>
</template>

<script>
    import Vue from 'vue'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'
    import movieService from "@/services/movieService";
    import { required , between  } from 'vuelidate/lib/validators'

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    })

    Vue.use(Vuelidate)
    Vue.use(VueSweetalert)

    export default {
        name: "FormReview",
        props: ['reviewBtnTitle','review'],
        data () {
            return {
                messagetitle: ' Add Review ',
                author: this.review.author,
                titleID: this.review.titleID,
                reviewedTitle: this.review.reviewedTitle,
                reviewt: this.review.review,
                rating: this.review.rating,
                movies: {},
                submitStatus: null
            }
        },
        validations: {
            author:{
                required
            },
            titleID:{
                required
            },
            reviewedTitle: {
                required
            },
            reviewt: {
                required
            },
            rating:{
                required,
                between: between(1, 10)
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
                        var review = {
                            author: this.author,
                            titleID: this.titleID,
                            reviewedTitle: this.reviewedTitle,
                            reviewt: this.review,
                            rating: this.rating
                        }
                        this.review = review
                        console.log('Submitting in ReviewForm : ' + JSON.stringify(this.review, null, 5))
                        this.addReview(this.review)
                    }, 500)
                }
            },
            addReview: function (review) {
                console.log('submitReview!')
                console.log('Submitting in submitReview : ' + review)
                movieService.postReview(review)
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
    #rev {
        height: 150px;
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