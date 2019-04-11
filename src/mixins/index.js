module.exports = {
  'PLAY_AUDIO':{
    methods:{
      playAudio(index){
        var hash = this.songList[index].hash
        console.log("hash的值为");
        console.log(hash);
        var info = {
          list: this.songList,
          index: index
        }
        this.$store.commit('setListInfo', info)
        this.$store.dispatch('getSong', hash)
      }
    }
  }
};
