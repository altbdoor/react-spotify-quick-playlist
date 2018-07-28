import swal from 'sweetalert2/dist/sweetalert2.js'

const baseBtnClass = `
    ba bw1 br-pill bg-transparent pointer
    no-underline ttu tracked fw6
    db w-100 pv2 ph3 pv3-ns ph4-ns
    mb2
`

const cancelBtnClass = `
    ${baseBtnClass}
    b--mid-gray mid-gray
    hover-bg-mid-gray hover-white
`

const confirmBtnClass = `
    ${baseBtnClass}
    b--green green
    hover-bg-green hover-white
`

const inputClass = `
    bg-transparent white
`

const swalPatch = swal.mixin({
    buttonsStyling: false,
    // focusConfirm: false,
    confirmButtonClass: confirmBtnClass,
    cancelButtonClass: cancelBtnClass,
    inputClass: inputClass,
})

export default swalPatch
