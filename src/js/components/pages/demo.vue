<template>
<div v-if="images.length" class="grid grid-cols-5 gap-4 bg-gray-200 border border-gray-300 rounded-sm p-4">
    <div v-for="image in images" :key="image.id" class="col-span-1">
        <div class="flex flex-col items-center justify-between p-2 bg-white border rounded">
            <img class="h-64" :ref="setItemRef">
            <p class="text-capitalize mt-3">{{ image.name }}</p>
            <p class="text-capitalize mt-3">{{ image.size }}</p>
            <button class="bg-red-400 text-white px-2 py-1 mt-3" :data-index="image.id" v-on:click="deleteImage">Delete</button>
        </div>
    </div>
</div>
<div v-if="!images.length" class="col-span-1 bg-gray-200 border border-gray-300 rounded-sm p-10">
    <p class="text-3xl font-semibold text-center">Upload Photo</p>
    <p class="text-center uppercase text-red-500 mt-5 pt-5 border-t border-red-400">Maximum uploadable photo size is 16 MB</p>
</div>
<hr/>
<div class="grid grid-cols-1 gap-4">
    <input type="file" ref="picker" multiple v-on:change="renderImages" accept="image/*">
    <v-button v-on:click="upload">Submit</v-button>
</div>
</template>
<script>
import UniqueID from '@/features/unique-id';
import formatBytes from '@/features/format-bytes';

export default {
    data() {
        return {
            images: [],
            imageRefs: [],
        }
    },
    methods: {
        setItemRef(el) {
            if (el) {
                this.imageRefs.push(el);
            }
        },
        beforeUpdate() {
            this.imageRefs = [];
        },
        deleteImage(event) {
            const index = event.target.getAttribute('data-index');
            const pos = this.images.findIndex((el) => el.id == index);
            if (pos >= 0) {
                this.images.splice(pos, 1);
            }
        },
        upload() {
            let formData = new FormData();
            for(let i =0; i< this.images.length; i++) {
                formData.append(`photos[]`, this.images[i].file);
            }
            axios({
                method: 'POST',
                url: `${app.uri}/upload`,
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        },
        renderImages(event) {
            let selectedFiles = event.target.files;
            for (let i =0; i< selectedFiles.length; i++) {
                const image = selectedFiles[i];
                this.images.push({
                    id: UniqueID().getID(),
                    name: image.name,
                    file: image,
                    size: formatBytes(image.size),
                });
            }
            for (let i = 0; i < this.images.length; i++) {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.imageRefs[i].src = reader.result;
                }
                reader.readAsDataURL(this.images[i].file);
            }
        }
    }
};
</script>
