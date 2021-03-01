<template>
    <form v-if="show" class="grid grid-cols-1 gap-4"  @submit.prevent="createDemo">
        <div>
        <BaseCheckbox
            label="Checkbox"
            v-model="event.is_admin"
            :error="errors.is_admin" />
        </div>

        <div>
        <BaseDatepicker
            label="the data 1"
            v-model="event.day1"
            :error="errors.day1" />
        </div>

        <div>
        <BaseDatepicker
            label="the data 2"
            v-model="event.day2"
            :error="errors.day2" />
        </div>

        <div>
        <BaseDatepicker
            label="the data 3"
            v-model="event.day3"
            :error="errors.day3" />
        </div>

        <div>
        <BaseInput
            label="Select a category"
            v-model="event.category"
            type="text"
            :error="errors.category"/>
        </div>
        <div>
        <BaseRadioGroup
            v-model="event.type"
            name="type"
            :options="[
                        { value: 1, label: 'Book' },
                        { value: 2, label: 'TV' },
                        { value: 3, label: 'VCR' }
                        ]"
            :error="errors.type" />
        </div>
        <div>
        <BaseSelect
            v-model="event.class"
            name="class"
            :options="[
                       { value: 1, label: 'LKG' },
                       { value: 2, label: 'UKG' },
                       { value: 3, label: 'Nursery' },
                       ]"
            :error="errors.class" />
        </div>
        <BaseButton type="submit">Submit</BaseButton>
        <BaseButton type="button" @click="doOK">OK</BaseButton>
    </form>

    <button @click="tog" type="button">Show</button>

    <pre>{{ event }}</pre>
</template>
<script>
export default {
    name: 'Demo',
    data () {
        return {
            show: false,
            event: {
                category: '',
                is_admin: null,
                type: '',
                class: '',
                day1: '1/1/2020',
                day2: '2/2/2020',
                day3: '3/3/2020'
            },
            errors: {},
        }
    },
    methods: {
        tog() {
            this.show = !this.show;
        },
        doOK() {
            this.errors = {};
        },
        createDemo() {
            this.errors.category = 'error category';
            this.errors.is_admin = 'error select admin';
            this.errors.type = 'error type';
            this.errors.class = 'error in class';
            this.errors.day = 'day is wrong';
        }
    }
}
</script>
