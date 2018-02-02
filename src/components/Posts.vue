<template>
  <div class="container">
    <h1 class="mb-4">The below is from a Firebase Database</h1>
    <h2>There's also a Flamelink CMS used for content creation</h2>
    <pre>
    </pre>
    <div>
      <div v-for="(item, key) in posts" :key="key">
        <h2 v-text="item.title" />
        <div class="card" v-for="image in media" :key="image['.key']" v-if="image.id == item.featuredImage">
          <div class="card-body">
            <h4>Featured Image</h4>
            {{ getImage(image.file, key) }}
            <img
            :id="'img' + key"
            :class="'bg-primary'" />
          </div>
        </div>
        <p class="lead" v-text="item.summary" />
        <div class="container px-0" v-html="item.content" />
      </div>
    </div>
  </div>
</template>

<script>
import {db, storage} from '../firebase/get-content'

export default {
  name: 'app',
  firebase: {
    posts: db.ref('flamelink/environments/production/content/blog/en-US'),
    schema: db.ref('flamelink/environments/production/schemas'),
    media: db.ref('flamelink/media/files')
  },
  methods: {
    getImage (file, key) {
      /* var starsRef = storage.ref('/flamelink/media/1517527945797_4d090f8bc86f.jpg') */
      var starsRef = storage.refFromURL('gs://flamelink-test-7800f.appspot.com/flamelink/media/' + file)

      /* return storage.refFromURL('gs://flamelink-test-7800f.appspot.com/flamelink/' + filename) */
      starsRef.getDownloadURL().then(function (url) {
        var img = document.getElementById('img' + key)
        img.src = url
        /* img.classList.remove('d-none') */
      }).catch(function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            console.log('File doesn\'t exist')
            break

          case 'storage/unauthorized':
            console.log('User doesn\'t have permission to access the object')
            break

          case 'storage/canceled':
            console.log('User canceled the upload')
            break

          case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response')
            break
        }
      })
    }
  }
}

/* "file": "1517527896975_8d5fa9cc.jpg", */
/* gs://flamelink-test-7800f.appspot.com/flamelink/media/1517527945797_4d090f8bc86f.jpg */
/* https://firebasestorage.googleapis.com/v0/b/flamelink-test-7800f.appspot.com/o/flamelink%2Fmedia%2F1517527945797_4d090f8bc86f.jpg?alt=media&token=fdf11881-fc9e-41c0-87b0-18d8ac011654 */
</script>
