<template>
            <form @submit.prevent="submit">
                        <div class="form-group" :class="{ 'form-group--error': $v.author.$error }">
                            <label class="form__label">Enter Author Name</label>
                            <input class="form__input" v-model.trim="$v.author.$model"/>
                        </div>
                        <div class="error" v-if="!$v.author.required">Author name is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.titleID.$error }">
                            <label class="form__label">title ID</label>
                            <input class="form__input" v-model.trim="$v.titleID.$model"/>
                        </div>
                        <div class="error" v-if="!$v.titleID.required">TitleID is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.reviewedTitle.$error }">
                            <label class="form__label">Film Title</label>
                            <input class="form__input" v-model.trim="$v.reviewedTitle.$model"/>
                        </div>
                        <div class="error" v-if="!$v.reviewedTitle.required">Film is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.review.$error }">
                            <label class="form__label">Write Review</label>
                            <input id="rev" class="form__input" v-model.trim="$v.review.$model"/>
                        </div>
                        <div class="error" v-if="!$v.review.required">Title is Required</div>

                        <div class="form-group" :class="{ 'form-group--error': $v.rating.$error }">
                            <label class="form-control-label" name="cost">Set Rating</label>
                            <input class="form__input" type="number" v-model.trim="rating"/>
                        </div>
                        <div class="error" v-if="!$v.rating.required">Rating is Required</div>
                        <div class="error" v-if="!$v.rating.between">Rating is between 1 and 10 </div>

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
        props: ['reviewBtnTitle','reviewt'],
        data () {
            return {
                messagetitle: ' Add Review ',
                author: this.reviewt.author,
                titleID: this.reviewt.titleID,
                reviewedTitle: this.reviewt.reviewedTitle,
                review: this.reviewt.review,
                rating: this.reviewt.rating,
                reviews: {},
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
            review: {
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
                        var reviewt = {
                            author: this.author,
                            titleID: this.titleID,
                            reviewedTitle: this.reviewedTitle,
                            review: this.review,
                            rating: this.rating
                        }
                        this.reviewt = reviewt
                        console.log('Submitting in ReviewForm : ' + JSON.stringify(this.reviewt, null, 5))
                        this.$emit('review-is-created-updated',this.reviewt)
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
        height: 100px;
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
