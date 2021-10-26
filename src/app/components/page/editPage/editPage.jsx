import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import { validator } from "../../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

const EditPage = ({ userId }) => {
  const history = useHistory()

  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  })
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    const data = api.users.getById(userId)
    if (data) {
      data.then((data) => {
        setData((prevState) => ({
          ...prevState,
          ...data
        }))
      })
    }
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена не корректно" }
    },
    name: {
      isRequired: { message: "Имя обязателено для заполнения" }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length !== 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log("data from form", data)
    history.push(`/users/${userId}`)
    api.users.update(userId, data)
  }

  if (professions) {
    return (
      <div className="container mt-3 ">
        <Link to={`/users/${userId}`} className="btn btn-primary">
          Назад
        </Link>
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit} className="ms-3">
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                defaultOption="Выбрать..."
                error={errors.profession}
                value={data.profession._id || data.profession}
                label="Выберите свою профессию"
                options={professions}
                onChange={handleChange}
                name="profession"
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                defaultValue={data.qualities}
              />
              <button
                type="submit"
                disabled={isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Изменить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return <h1 className="ms-3">Loading...</h1>
  }
}

EditPage.propTypes = {
  userId: PropTypes.string.isRequired
}
export default EditPage
